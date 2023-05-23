import {useLoaderData} from "react-router-dom";


export function singleBillLoader({params}){
    const billID = params.billID;
    return { billID };
}

function PayBill(props) {

    const { billID } = useLoaderData();

    return (
        <div>

        </div>
    )
}

export default PayBill;
