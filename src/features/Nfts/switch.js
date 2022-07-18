import React from "react";
import SwitchSelector from "react-switch-selector";

const options = [
    { label: "Dollar" },
    { label: "Bitcoin" }
];
const styles = {
    xlarge: {
        fontSize: 22
    },
};
export default function Switches() {

    return (
        <div style={{ width: 163, height: 38, fontFamily: 'Blanch', fontSize: 22 }} >
            <SwitchSelector

                options={options}
                backgroundColor={"#2B2B2B"}
                fontColor={"#FFFFFF"}
                selectedFontColor="#232323"
                selectedBackgroundColor="#FFFFFF"
                fontSize={styles.xlarge}
            />
        </div>
    );
}
