import { RoadmapType } from 'types/feedback';

export const categoryList = [
    'All',
    'UI',
    'UX',
    'Enhancement',
    'Bug',
    'Feature',
];

export const roadmapList:{color: string, name: RoadmapType}[] = [
    {
        color: '#F49F85',
        name: 'Planned',
    },
    {
        color: '#AD1FEA',
        name: 'In-Progress',
    },
    {
        color: '#62BCFA',
        name: 'Live',
    },
];

export const SORT_BY_DEFAULT_VALUE = '0';
export const sortParamMap: {[key: string]: string} = {
    '0': '',
    '1': 'upvotes|asc',
    '2': 'commentCount|desc',
    '3': 'commentCount|asc',
};
