import * as request from '~/utils/httpRequest';

const searchTerm = async (slug: string, taxonomy: string) => {
    try {
        const res = await request.get(`term`, {
            params: {
                slug: slug,
                taxonomy: taxonomy,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
};

// api/term?slug=slug&taxonomy=tag
const getTermByTagSlug = async (slug: string) => await searchTerm(slug, 'tag');

// api/term?slug=slug&taxonomy=category
const getTermByCategorySlug = async (slug: string) => await searchTerm(slug, 'category');

export { getTermByTagSlug, getTermByCategorySlug };
