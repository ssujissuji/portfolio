import content from '../content.json';

export type PortfolioContent = typeof content;
export type FeaturedProject = PortfolioContent['featuredProject'];
export type FeaturedStep = FeaturedProject['steps'][number];
export type Project = PortfolioContent['otherProjects'][number];

export default content;
