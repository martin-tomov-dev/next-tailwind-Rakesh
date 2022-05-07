import Header from "./Header";
import useUser from "../../lib/hooks/UseUser";

export function InAppLayout({ children }) {
  const { user } = useUser(null);

  return (
    <div>
      <Header
        isSignedIn={!!user}
        imgSrc="/images/urbanMeyer.jpg"
        name={user ? `${user.firstName} ${user.lastName}` : ""}
      />

      <div className="pt-8">{children}</div>
    </div>
  );
}

//this ia layout function, so children is really page
const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export const WithAuthLayout = (component) => {
  component.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

  return component;
};
