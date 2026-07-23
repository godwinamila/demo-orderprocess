import { UserProfile } from "@asgardeo/nextjs";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-ink">My Profile</h1>
      <UserProfile
        cardLayout
        fallback={<p className="text-sm text-ink-muted">Please sign in to view your profile.</p>}
      />
    </main>
  );
}
