import {Payment} from "@/app/payment/[operatorId]/Payment";

type Props = {
  params: {
    operatorId: string
  }
}

export default async function Page({params}: Props) {
  return (
    <main>
      <Payment id={params.operatorId}/>
    </main>
  );
}