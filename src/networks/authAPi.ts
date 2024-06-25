    import axiosClient from './axiosClient';

    class AuthAPI {
        HandleAuthentication = async (
            url: string,
            data?: any,
            method?: 'get' | 'post' | 'put' | 'delete',
        ) => {
            try {
                const response = await axiosClient({
                    url: `/auth${url}`,
                    method: method ?? 'get',
                    data,
                });
                return response;
            } catch (error) {
            return error        
            }
        };
    }

    const authenticationAPI = new AuthAPI();
    export default authenticationAPI;
