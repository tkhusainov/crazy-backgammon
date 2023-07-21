import {AxiosError} from 'axios';
import {useCallback, useState, useEffect} from 'react';

type Options<T> = {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError) => void;
    onFinally?: () => void;
    loadingDefault?: boolean; // useful when need to load a data on component mount
}

/**
 * The hook is used to simplify work with the API received data.
 * It takes care of loading state, data received, error received, and others
 *
 * @param fetchData Function returns data.
 * @param options
 * @param options.onSuccess Success callback. Should be wrapped with useCallback hook.
 * @param options.onError Error callback. Should be wrapped with useCallback hook.
 */
export function useRequest<T, A extends unknown[] = []>(
    fetchData: (...args: A) => Promise<T>,
    {
        onSuccess,
        onError,
        onFinally,
        loadingDefault = false
    }: Options<T> = {}
) {
    const [firstDataLoaded, setFirstDataLoaded] = useState(false);
    const [loading, setLoading] = useState(loadingDefault);
    const [loadedAt, setLoadedAt] = useState<Date>();
    const [error, setError] = useState<AxiosError>();
    const [data, setData] = useState<T>();
    const [initialData, setInitialData] = useState<T>();

    const send = useCallback(async (...args: A) => {
        setLoading(true);
        setError(undefined);
        setLoadedAt(undefined);
        try {
            const response = await fetchData(...args);
            setData(response);
            onSuccess?.(response);
            setLoadedAt(new Date());
        } catch (e) {
            setError(e as AxiosError);
            onError?.(e as AxiosError);
        } finally {
            setLoading(false);
            setFirstDataLoaded(true);
            onFinally?.();
        }
    }, [fetchData, onSuccess, onError, onFinally]);

    const reset = useCallback(() => {
        setFirstDataLoaded(false);
        setLoading(false);
        setError(undefined);
        setInitialData(undefined);
        setData(undefined);
        setLoadedAt(undefined);
    }, []);

    useEffect(() => {
        if (!firstDataLoaded) {
            setInitialData(data);
        }
    }, [firstDataLoaded, data]);

    return {send, data, initialData, loading, initialLoading: loading && !firstDataLoaded, error, loadedAt, reset};
}
