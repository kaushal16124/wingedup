import { useState } from "react"
import MemberContext from "./memberContext"

const MemberState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST_URI;
    const initialMember = []
    const [members, setMembers] = useState(initialMember)

    //Fetching all Members
    const getMembers = async () => {
        const response = await fetch(`${host}/api/member/fetchallmembers`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });



        const res = await response.json()
        setMembers(res)
    }

    //Adding a member
    const addMember = async (name, age, exp, desc, profilePicUrl, instaUrl, whatsAppUrl, facebookUrl) => {
        let added = false;
        const response = await fetch(`${host}/api/member/createmember`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({ name, age, exp, desc, profilePicUrl, instaUrl, whatsAppUrl, facebookUrl })
        });
        const res = await response.json()
        if (res.success) {
            added = true;
            getMembers();


        }
        return added;

    }

    //Edit member
    const updateMember = async (id, name, age, exp, desc, profilePicUrl, instaUrl, whatsAppUrl, facebookUrl) => {
        let updated = false;
        const response = await fetch(`${host}/api/member/updatemember/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                // Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({ name, age, exp, desc, profilePicUrl, instaUrl, whatsAppUrl, facebookUrl }),
        });
        const res = await response.json()
        if (res.success) {
            updated = true;
            let newMember = JSON.parse(JSON.stringify(members))
            for (let index = 0; index < newMember.length; index++) {
                const element = newMember[index];
                if (element._id == id) {
                    newMember[index].name = name;
                    newMember[index].age = age;
                    newMember[index].exp = exp;
                    newMember[index].desc = desc;
                    newMember[index].profilePicUrl = profilePicUrl;
                    newMember[index].instaUrl = instaUrl;
                    newMember[index].whatsAppUrl = whatsAppUrl;
                    newMember[index].facebookUrl = facebookUrl;
                    break;
                }
            }
            setMembers(newMember);


        }
        return updated;
    }

    //Delete member
    const deleteMember = async (id) => {
        let deleted = false;
        const response = await fetch(`${host}/api/member/deletemember/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                // Authorization: localStorage.getItem('token')
            }
        });
        const res = await response.json()
        if (res.success) {
            deleted = true;
            const newMembers = members.filter((item) => { return item._id != id })

            setMembers(newMembers);

        }
        return deleted;

    }

    return (
        <MemberContext.Provider value={{ members, addMember, updateMember,setMembers,deleteMember, getMembers }}>
            {props.children}
        </MemberContext.Provider>
    )
}

export default MemberState;