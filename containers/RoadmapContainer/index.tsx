import React, { CSSProperties, HTMLAttributes } from 'react';
import { roadmapList } from 'lib/constants';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    itemStyle?: { root: string, name: string, count: string};
}

const RoadmapContainer: React.FC<IProps> = ({ itemStyle, ...props }) => {
    return (
        <div {...props}>
            {roadmapList.map(({ color, name }, index) => (
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
                        0
                    </span>
                </div>
            ))}
        </div>
    )
}

export default RoadmapContainer;
