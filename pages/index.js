import PrivateRoute from "../components/privateRoute";

export default function HomePage() {
  return (
    <PrivateRoute>
      <h1>home Page </h1>
    </PrivateRoute>
  );
}
