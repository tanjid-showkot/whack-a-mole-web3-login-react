import React from 'react';

const Team = (props) => {
    const { name, img, Position } = props.member
    return (
        <div>
            <div className="card">
                <img src={img} className="card__image" alt="brown couch" />
                <div className="card__content">
                    <time className="card__date">{Position}</time>
                    <span className="card__title">{name}</span>

                </div>
            </div>

        </div>
    );
};

export default Team;