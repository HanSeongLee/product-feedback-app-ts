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
