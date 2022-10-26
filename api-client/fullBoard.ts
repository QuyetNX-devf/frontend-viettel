import axiosClient from './axios-client';

export const fullBoardApi = {
    updateIndexPackageData(payload: any) {
        return axiosClient.put(`/sort/swap-data-package`, payload);
    },
    updateIndexCatPackageData(payload: any) {
        return axiosClient.put(`/sort/swap-column-cat`, payload);
    },
};
