import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { Calendar } from "./pages/calendar";
import { Market } from "./pages/market";
import { Sectors } from "./pages/sectors";
import { SectorDetail } from "./pages/sector-detail";
import { Indexes } from "./pages/indexes";
import { IndexDetail } from "./pages/index-detail";
import { Portfolio } from "./pages/portfolio";
import { Performance } from "./pages/performance";
import { Setups as Ideas } from "./pages/setups";
import { SetupDetail as IdeaDetail } from "./pages/setup-detail";
import { StockDetail } from "./pages/stock-detail";
import { AddOrder } from "./pages/add-order";
import { OrderDetail } from "./pages/order-detail";
import { Profile } from "./pages/profile";
import { SearchPage } from "./pages/search";
import { Bookmarks } from "./pages/bookmarks";
import { Notifications } from "./pages/notifications";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { ForgotPassword } from "./pages/auth/forgot-password";
import { ResetPassword } from "./pages/auth/reset-password";

export const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "signup", Component: Register }, // Alias for register
      { path: "forgot-password", Component: ForgotPassword },
      { path: "reset-password", Component: ResetPassword },
    ],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "calendar", Component: Calendar },
      { path: "market", Component: Market },
      { path: "sectors", Component: Sectors },
      { path: "sectors/:sectorId", Component: SectorDetail },
      { path: "indexes", Component: Indexes },
      { path: "indexes/:indexId", Component: IndexDetail },
      { path: "stocks/:stockId", Component: StockDetail },
      { path: "orders/add", Component: AddOrder },
      { path: "orders/:orderId", Component: OrderDetail },
      { path: "portfolio", Component: Portfolio },
      { path: "performance", Component: Performance },
      { path: "ideas", Component: Ideas },
      { path: "ideas/:setupId", Component: IdeaDetail },
      { path: "profile", Component: Profile },
      { path: "search", Component: SearchPage },
      { path: "bookmarks", Component: Bookmarks },
      { path: "notifications", Component: Notifications },
    ],
  },
]);