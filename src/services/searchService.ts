import * as request from '~/utils/httpRequest';

const search = async (s: string, page = 1, limit = 5) => {
    try {
        const res = await request.get(`search`, {
            params: {
                s: s.replace(/ /g, '+'),
                page: page,
                limit: limit,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { search };
