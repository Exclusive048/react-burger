import { useMatch } from 'react-router-dom'
import ProfileBody from './profile-body'
import profileStyles from './profile.module.css'
import ProfileSideBar from './profile-sidebar'

const ProfilePage = () => {
	return (
		<section className={`${profileStyles.main} mt-20`}>
			<ProfileSideBar/>
			<div className={profileStyles.userInfo}>
				<ProfileBody/>
			</div>
		</section>
	)
}

export default ProfilePage