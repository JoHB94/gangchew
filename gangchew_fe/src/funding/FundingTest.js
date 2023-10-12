import CancelButton from "../component/buttons/CancelButton";
import OkButton from "../component/buttons/OkButton";
import CancelFunding from "../component/buttons/CancelFunding";
import DoFunding from "../component/buttons/DoFunding"
import EmptyHeart from "../component/buttons/EmptyHeart";
import FullHeart from "../component/buttons/FullHeart";
import UpdateFunding from "../component/buttons/UpdateFunding";
import DeleteFunding from "../component/buttons/DeleteFunding";
import StartFunding from "../component/buttons/StartFunding";
import Card from "../component/Card";

export default function FundingTest(){

    return(
        <div>
            <OkButton/>
            <CancelButton/>
            <CancelFunding/>
            <DoFunding/>
            <EmptyHeart/>
            <FullHeart/>
            <UpdateFunding/>
            <DeleteFunding/>
            <StartFunding/>
        </div>
    )
}