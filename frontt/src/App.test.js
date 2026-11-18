/** @jest-environment node */

import { renderToStaticMarkup } from "react-dom/server";
import ProtectedRoute from "./components/ProtectedRoute";
import useGetUserInfo from "./hooks/useGetUserInfo";

jest.mock("./hooks/useGetUserInfo", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("react-router-dom", () => ({
  Navigate: ({ to }) => <span>{to}</span>,
  Outlet: () => <h1>Tableau de bord</h1>,
}), { virtual: true });

test.each([
  [undefined, false, "/signin"],
  [{ id: 1 }, true, "/dashboard"],
  [{ id: 1 }, false, "Tableau de bord"],
  [{ id: 1, admin: true }, true, "Tableau de bord"],
])("checks dashboard access for %j with admin=%s", (user, admin, expected) => {
  useGetUserInfo.mockReturnValue({ data: user });

  const markup = renderToStaticMarkup(<ProtectedRoute admin={admin} />);
  expect(markup).toContain(expected);
});
