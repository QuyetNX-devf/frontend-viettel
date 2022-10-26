import axios from 'axios';
export const uploadImage = async (image: string) => {
    try {
        var bodyFormData = new FormData();
        bodyFormData.append('image', image);

        let res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${'564dfb6692222e3e48af50abcbb0ac71'}`,
            bodyFormData
        );
        if (res.data.success) {
            return res.data.data;
        }
    } catch (error) {
        console.log(error);
    }
};
