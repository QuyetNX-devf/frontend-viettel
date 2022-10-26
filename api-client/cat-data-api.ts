import axiosClient from './axios-client';

export const catPackageApi = {
    get() {
        return axiosClient.get('/catPackage/allCat');
    },
    delete(idCat: string) {
        return axiosClient.delete(`/catPackage/${idCat}`);
    },
    update(payload: any) {
        return axiosClient.put(`/catPackage`, payload);
    },
    add(payload: any) {
        return axiosClient.post(`/catPackage`, payload);
    },
};
