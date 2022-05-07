import ProfileCard from "../components/profile/ProfileCard";
import useSWR from "swr";
import useUser from "../lib/hooks/UseUser";
import useCognito from "../lib/hooks/UseCognito";

export default function Profile() {
  const { user, loading: userDataLoading } = useUser();
  const { cognitoClient } = useCognito();
  const { data } = useSWR("/api/profile");

  const showLoading = !data || !user;

  const onClick = () => {
    cognitoClient.refreshSession();
  };

  if (userDataLoading || showLoading) {
    //if we don't know anything about the user yet don't render?
    return <></>;
  }

  const mockUserData = {
    "phoneNumber": "5555555555",
    "receivesSms": false,
    "address1": "545 Alexander Way",
    "address2": null,
    "city": "Minneapolis",
    "state": "MN",
    "zip": "23345",
    "yearly_salary": null,
    "hourly_rate": null,
    "rate_negotiation": false,
    "level_of_education": "Some high school or vocational training",
    "titles": [
        "F*&% the Prom"
    ],
    "skills": [
        "Four Hearts, Four Roads"
    ],
    "certifications": [
        "19 Going on 40"
    ],
    "preferredWorkStyles": [],
    "employment": [],
    "education": []
}

  return (
    <>
      {showLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex">
            <ProfileCard user={user} profileData={data} />
          </div>
          <div>
            <a onClick={onClick}>refresh that token</a>
          </div>
        </>
      )}
    </>
  );
}
