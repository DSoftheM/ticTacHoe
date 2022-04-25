export default function ToggleOrder(props) {
    return (
        <form onClick={props.onReversingClick()}>
            <label htmlFor="reverseOrder">Reverse Order</label>
            <input type='checkbox' id='reverseOrder'></input>
        </form>
    )
}