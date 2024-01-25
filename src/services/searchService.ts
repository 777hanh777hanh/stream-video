import * as request from '~/utils/httpRequest';

const search = async ({
    s,
    page = 1,
    limit = 5,
    searchBy,
    tags,
    genres,
}: {
    s?: string;
    page?: number;
    limit?: number;
    searchBy?: string;
    tags?: string;
    genres?: string;
}) => {
    try {
        const res = await request.get(`search`, {
            params: {
                s: s?.replace(/ /g, '+'),
                page: page,
                limit: limit,
                searchBy: searchBy,
                tags: tags,
                genres: genres,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
};

export { search };
