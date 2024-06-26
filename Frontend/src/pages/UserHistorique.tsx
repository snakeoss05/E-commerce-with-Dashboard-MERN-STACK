import { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";
import { isArray } from "lodash";
import UserAccount from "./UserAcoount";
interface User {
  FirstName: string;
  LastName: string;
  AddressLine: string;
  PhoneNumber: number;
  City: string;
  email: string;
}
interface Order {
  adresse: string;
  cartitems: {
    id: string;
    quantity: number;
    imgurl: string;
  }[];
  city: string;
  clientId: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  _id: any;
}

export default function UserHistorique() {
  const [myOrder, setmyOrder] = useState<Order[]>([]);

  const [user, setuser] = useState<User | null>();
  const [myemail, setmyemail] = useState();
  useEffect(() => {
    const getUserById = async () => {
      var token = Cookies.get("token");
      try {
        const response = await axios.get(
          `https://alakifekbackend.onrender.com/api/ath/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setuser(response.data);
        setmyemail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    if (!user) getUserById();
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://alakifekbackend.onrender.com/api/submit-form/clientCommandst/${myemail}`
      )
      .then((rep) => {
        setmyOrder(rep.data.clientCommands);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [myemail]);

  return (
    <>
      <UserAccount />
      <div className="py-3 table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>City</th>
              <th>PhoneNumber</th>

              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {myOrder?.map((clientCommand: any) => (
              <tr key={clientCommand._id} className="border-bottom">
                <td>{clientCommand.firstname}</td>
                <td>{clientCommand.lastname}</td>
                <td>{clientCommand.adresse}</td>
                <td>{clientCommand.city}</td>
                <td>{clientCommand.phoneNumber}</td>
                <td>
                  {clientCommand.cartitems.map((detail: any) => {
                    return (
                      <li
                        key={detail.id}
                        className="d-flex align-items-center justify-content-start my-2">
                        {" "}
                        <div className="col-6">
                          <h6>Item Name:</h6>
                          <p className="me-2"> {detail.title}</p>
                        </div>
                        <img
                          src={detail.imgurl}
                          width="50"
                          height="60"
                          className="mr-2"
                        />
                        <div className="d-flex flex-column justify-content-start ">
                          <span className="text-muted me-auto">
                            Price : {detail.price} DT
                          </span>
                          <span className="text-muted me-auto">
                            Quantity : {detail.quantity}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
