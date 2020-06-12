import React from "react";
import PropTypes from "prop-types";

export default class Map extends React.Component {
    mapNode = null;
    map = null;

    componentDidMount() {
        this.initializeMap();
    }


    initializeMap = () => {
        const {
            center,
            zoomControl,
            location,
            zoom,
            hybrid,
            search,

            // Map events
            onResize,
            onZoom,
            onMove,
            onClick,
            onDblclick,
            onMousedown,
            onMouseup,
            onMouseover,
            onMouseout,
            onKeypress
        } = this.props;
        const timer = setInterval(() => {
            let tried = 0;
            // eslint-disable-next-line no-undef
            if (MapmyIndia && MapmyIndia.Map) {
                clearInterval(timer);
                /**
                 * Init Map
                 */
                // eslint-disable-next-line no-undef
                this.map = new MapmyIndia.Map(this.mapNode, {
                    center,
                    zoomControl,
                    location,
                    zoom,
                    hybrid,
                    search
                });
                // eslint-disable-next-line no-undef
                new MapmyIndia.covidLayer(
                    {
                        map: this.map,
                        position: "topleft",
                        showControl: true,
                        defaultLayer: 'containment_zone_gradient',
                        expand: false,
                        multiple: false,
                        info: true,
                        skiplayerIds: [
                            'corona_district_cases',
                            'state_corona_stats',
                            'corona_treatment_centre',
                            'corona_testing_centre',
                            'corona_sample_collection_centre',
                            'corona_isolation_ward',
                            'districts_containment_zone',
                            'government_ration_distribution',
                            'hunger_and_night_shelter',
                            'hunger_relief_centre'
                        ]
                    });

                /**
                 * Attach events
                 */
                onResize && this.map.addEventListener("resize", onResize);
                onZoom && this.map.addEventListener("zoom", onZoom);
                onClick && this.map.addEventListener("click", onClick);
                onDblclick && this.map.addEventListener("dblclick", onDblclick);
                onKeypress && this.map.addEventListener("keypress", onKeypress);
                onMousedown && this.map.addEventListener("mousedown", onMousedown);
                onMouseout && this.map.addEventListener("resize", onMouseout);
                onMouseover && this.map.addEventListener("mouseover", onMouseover);
                onMove && this.map.addEventListener("move", onMove);
                onMouseup && this.map.addEventListener("mouseup", onMouseup);
            } else {
                tried++;
                tried === 1500 && clearInterval(timer);
            }
        }, 100);
    };


    render() {
        const {width, height} = this.props;
        return (
            <div
                ref={e => (this.mapNode = e)}
                id="map"
                className="map"
                style={{width, height}}
            ></div>
        );
    }
}

Map.defaultProps = {
    center: [18.5314, 73.8446],
    zoomControl: true,
    hybrid: true,
    location: true,
    search: true,
    zoom: 15,
    height: "500px",
    width: "100%",
    markers: []
};

Map.propTypes = {
    // map attributes
    center: PropTypes.array,
    zoomControl: PropTypes.bool,
    location: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    zoom: PropTypes.number,
    hybrid: PropTypes.bool,
    search: PropTypes.bool,

    // Map events
    onResize: PropTypes.func,
    onZoom: PropTypes.func,
    onMove: PropTypes.func,
    onClick: PropTypes.func,
    onDblclick: PropTypes.func,
    onMousedown: PropTypes.func,
    onMouseup: PropTypes.func,
    onMouseover: PropTypes.func,
    onMouseout: PropTypes.func,
    onKeypress: PropTypes.func,

    // Markers
    markers: PropTypes.array
};
