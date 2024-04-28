import {Appbar} from '../Components/Appbar'
import {Balance} from '../Components/Balance'
import { Users } from '../Components/Users'
// import { Balance } from './Balance'
export const Dashboard = ({}) => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}