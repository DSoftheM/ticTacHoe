export default function Square(props) {
    const color = props.isColored ? 'rgba(238, 49, 222, 0.5)' : '#fff';
    return (
        <button 
            style={{backgroundColor: color}}
            className="square"
            onClick={props.onClick}>
                {props.value}
        </button>
    );
}