import ChatFeatures from "../components/ChatFeatures";
import SideBar from "../components/SideBar";
import TopSearchArea from "../components/TopSearchArea";

const Chatting = () => {
    return (
        <div className='home-container'>
            <SideBar />
            <div className='home-contents'>
                <TopSearchArea />
                <ChatFeatures />
            </div>
        </div>
    )
}

export default Chatting;