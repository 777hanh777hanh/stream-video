import * as request from '~/utils/httpRequest';
import * as searchServices from './searchService';

// api/watch?slug=slug
const infoVideo = async (slug: string) => {
    try {
        const res = await request.get(`watch`, {
            params: {
                slug: slug,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

// 	api/search?tags=tag-name&searchBy=slug
const searchListVideo = async ({
    tags,
    searchBy = 'slug',
    limit = 77,
}: {
    tags: string;
    searchBy?: string;
    limit?: number;
}) => await searchServices.search({ tags, searchBy, limit });

export { infoVideo, searchListVideo };
