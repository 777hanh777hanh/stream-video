import { routes } from '~/routes';

// get the path of a stream
const streamPath = (slug: string) => {
    const slugWithoutSlash = removeFirstSlash(slug);

    return routes.stream.replace(':slug', slugWithoutSlash);
};

// Remove the first slash of a string
function removeFirstSlash(slug: string) {
    if (slug[0] === '/') return slug.slice(1);
    return slug;
}

export { streamPath, removeFirstSlash };
