import React, { CSSProperties, HTMLAttributes } from 'react';
import { roadmapList as roadmapConstantList } from 'lib/constants';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    itemStyle?: { root: string, name: string, count: string};
}

const useRoadmap = () => {
    return useStore(
        (store) => ({
            roadmapList: store.roadmapList,
        }),
        shallow
    );
};

const RoadmapContainer: React.FC<IProps> = ({ itemStyle, ...props }) => {
    const { roadmapList } = useRoadmap();

    return (
        <div {...props}>
            {roadmapConstantList.map(({ color, name }, index) => (
                <div className={itemStyle?.root}
                     style={{
                         '--circle-color': color,
                     } as CSSProperties}
                     key={index}
                >
                    <span className={itemStyle?.name}>
                        {name}
                    </span>
                    <span className={itemStyle?.count}>
                        {roadmapList?.find(({status}) => status === name.toLowerCase())?.count}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default RoadmapContainer;
