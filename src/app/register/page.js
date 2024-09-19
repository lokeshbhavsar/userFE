"use client";

import dynamic from 'next/dynamic';

// Dynamically import the Signup component
const Signup = dynamic(() => import('../../../component/signup'), {
  ssr: true, // Disable server-side rendering for this component
});
import { Provider } from "react-redux";
import { store } from "@/Redux/store/store";

export default function Page() {
  return (
    <div>
      <Provider store={store}>
        <Signup />
      </Provider>
    </div>
  );
}
