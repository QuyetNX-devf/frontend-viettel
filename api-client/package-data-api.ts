import axiosClient from './axios-client';

interface QueryParams {
    limit?: number;
    categoryId?: string;
    page?: number;
    packageId?: string;
}
export const packageDataApi = {
    delete(idCat: string) {
        return axiosClient.delete(`/packageData/${idCat}`);
    },
    update(payload: any) {
        return axiosClient.put(`/packageData`, payload);
    },
    add(payload: any) {
        return axiosClient.post(`/packageData`, payload);
    },
    get({ limit, categoryId, page, packageId }: QueryParams) {
        const _limit = limit ? `&limit=${limit}` : '';
        const _categoryId = categoryId ? `&categoryId=${categoryId}` : '';
        const _page = page ? `&page=${page}` : '';
        const _packageId = packageId ? `&packageId=${packageId}` : '';

        const pathApi = `/packageData?${_limit}${_categoryId}${_page}${_packageId}`;
        return axiosClient.get(pathApi);
    },
};
