import { Avatar, Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material"
import { useAuth } from "../../providers/AuthProvider"
import { useLocale } from "../../providers/LocaleProvider"
import PageHeader from "../../components/common/PageHeader"

const ProfileField = ({ label, value }) => (
	<Box>
		<Typography variant="caption" color="text.secondary">
			{label}
		</Typography>
		<Typography sx={{ overflowWrap: "anywhere" }}>{value}</Typography>
	</Box>
)

const Profile = () => {
	const { user } = useAuth()
	const { t } = useLocale()

	const personalDetails = [
		["Full Name", user?.name],
		["Email", user?.email],
		["Username", user?.username],
		["Phone Number", user?.phone],
		["Date of Birth", user?.dateOfBirth],
		["Gender", user?.gender ? t(user.gender[0].toUpperCase() + user.gender.slice(1)) : null],
		["Address", user?.address],
		["City", user?.city],
		["Country", user?.country],
	].filter(([, value]) => value)

	const initials = user?.name
		?.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0])
		.join("")
		.toUpperCase()

	return (
		<Box>
			<PageHeader title="Profile" subtitle="Your account details." />

			<Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
				<Box sx={{ p: { xs: 2.5, sm: 4 } }}>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ sm: "center" }}>
						<Avatar
							src={user?.image || undefined}
							alt={user?.name || t("Profile")}
							sx={{ width: 88, height: 88, bgcolor: "primary.main", fontSize: 30, fontWeight: 700 }}
						>
							{initials}
						</Avatar>
						<Box sx={{ minWidth: 0, flex: 1 }}>
							<Typography variant="h5" fontWeight={700} sx={{ overflowWrap: "anywhere" }}>
								{user?.name || t("Profile")}
							</Typography>
							{user?.email && <Typography color="text.secondary">{user.email}</Typography>}
							<Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 1 }}>
								<Chip size="small" label={t(user?.role === "admin" ? "Admin" : "Member")} />
								<Chip
									size="small"
									label={t(user?.active === false ? "Inactive" : "Active")}
									color={user?.active === false ? "default" : "success"}
									variant="outlined"
								/>
							</Stack>
						</Box>
					</Stack>
				</Box>

				<Divider />

				<Box sx={{ p: { xs: 2.5, sm: 4 } }}>
					<Typography variant="h6" fontWeight={600} mb={2.5}>
						{t("Personal details")}
					</Typography>
					<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 2.5 }}>
						{personalDetails.map(([label, value]) => (
							<ProfileField key={label} label={t(label)} value={value} />
						))}
					</Box>

					<Divider sx={{ my: 3 }} />

					<Typography variant="h6" fontWeight={600} mb={2.5}>
						{t("Account details")}
					</Typography>
					<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 2.5 }}>
						<ProfileField label={t("Role")} value={t(user?.role === "admin" ? "Admin" : "Member")} />
						<ProfileField label={t("Account status")} value={t(user?.active === false ? "Inactive" : "Active")} />
						{user?.id != null && <ProfileField label={t("User ID")} value={user.id} />}
					</Box>
				</Box>
			</Paper>
		</Box>
	)
}

export default Profile
