import * as request from '~/utils/httpRequest';

const home = async () => {
    try {
        const res = await request.get(`home`, {});

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { home };
