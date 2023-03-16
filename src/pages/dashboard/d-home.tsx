import Button from "@mui/material/Button";
import { useAccount } from "./../../hooks/use-account";

const DHome = () => {
  const { account } = useAccount();
  return (
    <div>
      ยินดีต้อนรับ {account?.firstName} {account?.lastName} Role:{" "}
      {account?.role}
      {/* ID: {account?.userId} */}
    </div>
  );
};

export default DHome;
