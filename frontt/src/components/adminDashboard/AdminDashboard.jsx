import useGetUserInfo from "../../hooks/useGetUserInfo";

const AdminDashboard = () => {
  const { data: user } = useGetUserInfo();
  if (!user) return null;

  return (
    <section className="w-full max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Mon profil</h1>
      <dl className="mt-4 space-y-3">
        <div>
          <dt className="font-medium">Nom</dt>
          <dd>{user.username}</dd>
        </div>
        <div>
          <dt className="font-medium">Adresse email</dt>
          <dd>{user.email}</dd>
        </div>
      </dl>
    </section>
  );
};

export default AdminDashboard;
