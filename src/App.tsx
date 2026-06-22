import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { FAQ } from '@/pages/FAQ'
import { Contact } from '@/pages/Contact'
import { Terms } from '@/pages/Terms'
import { Privacy } from '@/pages/Privacy'
import { Social } from '@/pages/Social'
import { NotFound } from '@/pages/NotFound'
import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import { ForgotPassword } from '@/pages/auth/ForgotPassword'
import { VerifyEmail } from '@/pages/auth/VerifyEmail'
import { Products } from '@/pages/store/Products'
import { ProductDetail } from '@/pages/store/ProductDetail'
import { Cart } from '@/pages/store/Cart'
import { Checkout } from '@/pages/store/Checkout'
import { Dashboard } from '@/pages/user/Dashboard'
import { Orders } from '@/pages/user/Orders'
import { Profile } from '@/pages/user/Profile'
import { Settings } from '@/pages/user/Settings'
import { Wishlist } from '@/pages/user/Wishlist'
import { Vouchers } from '@/pages/user/Vouchers'
import { Wallet } from '@/pages/wallet/Wallet'
import { Withdraw } from '@/pages/wallet/Withdraw'
import { History } from '@/pages/wallet/History'
import { CashQuest } from '@/pages/cashquest/CashQuest'
import { QuestDetail } from '@/pages/cashquest/QuestDetail'
import { ReferralPage } from '@/pages/referral/ReferralPage'
import { PaymentSuccess } from '@/pages/payment/PaymentSuccess'
import { PaymentFailed } from '@/pages/payment/PaymentFailed'
import { Support } from '@/pages/support/Support'
import { CSChatPage } from '@/pages/support/CSChatPage'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/social" element={<Social />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/vouchers" element={<Vouchers />} />

            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet/withdraw" element={<Withdraw />} />
            <Route path="/wallet/history" element={<History />} />

            <Route path="/cashquest" element={<CashQuest />} />
            <Route path="/cashquest/:id" element={<QuestDetail />} />

            <Route path="/referral" element={<ReferralPage />} />

            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failed" element={<PaymentFailed />} />

            <Route path="/support" element={<Support />} />
            <Route path="/support/chat" element={<CSChatPage />} />
            <Route path="/notifications" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
