import * as prismic from '@prismicio/client';

// The repository name from your Prismic account
export const repositoryName = 'sgsasesora';

const client = prismic.createClient(repositoryName);

export default client;
