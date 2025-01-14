import ProfileBody from './profile-body'
import profileStyles from './profile.module.css'
import ProfileSideBar from './profile-sidebar'
import { FC } from 'react'

const ProfilePage: FC = () => {
	
	return (
		<section className={`${profileStyles.main} mt-20`}>
			<ProfileSideBar isOrderPage={false}/>
			<div>
				<ProfileBody/>
			</div>
		</section>
	)
}

export default ProfilePage