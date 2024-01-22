import GridLoader from "react-spinners/GridLoader"

const Loader = ({ style, size = 15, color = "#DDBF79" }) => {
    return (
        <div style={{ textAlign: 'center', ...style }}>
            <GridLoader size={size} color={color} loading={true} />
        </div>
    )
}

export default Loader