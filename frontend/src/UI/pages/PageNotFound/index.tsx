import React, { ReactElement } from 'react'
import {
	IonCol,
	IonContent,
	IonGrid,
	IonPage,
	IonRow,
	IonText,
} from '@ionic/react'
import ToolBar from '../../components/ToolBar'

const PageNotFound: React.FC = (): ReactElement => {
	return (
		<IonPage>
			<ToolBar showLoginBtn />
			<IonContent>
				<IonGrid>
					<IonRow justify-content-center>
						<IonCol class="ion-text-center">
							<IonText>
								<h3>page not found</h3>
							</IonText>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}
export default PageNotFound
