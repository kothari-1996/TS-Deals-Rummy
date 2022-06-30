import signUpHandler from "./signupHandler";
import EVENT from "../constants/event";
import joinTable  from "../../src/services/playTable/joinTable";
const handler = async(socket:any, eventData:any) =>{

    let response: any;
    
    switch(eventData.event.toLowerCase()){
        
        case EVENT.SIGN_UP_SOCKET_EVENT:
        response = await signUpHandler(socket, eventData);
        console.log("<<=========Response========>>", response);

        if (response && 'tableId' in response && !response['reconnect'])
        { joinTable(response, socket, false); }
        break;   
        
        default:
        break;
    };
}
export = handler;
