import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../context/ThemeContext";
import ButtonComponent from "../../base/Button";

interface DateTimePickerComponentProps {
	label: string;
	dateTime: Date;
	setDateTime: (newDate: Date) => void;
}

const DateTimePickerComponent = ({ label, dateTime, setDateTime }: DateTimePickerComponentProps) => {
	const { themeVariables } = useTheme();
	const [tempDate, setTempDate] = useState(dateTime);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const showPicker = () => {
		setTempDate(dateTime); // Réinitialise la sélection actuelle
		setPickerMode("date");
		setModalVisible(true);
	};

	const onChange = (event: any, selectedDate?: Date) => {
		if (selectedDate) {
			setTempDate(selectedDate); // Met à jour tempDate sans fermer
		}
	};

	const confirmDate = () => {
		setDateTime(tempDate); // Met à jour la vraie valeur
		setModalVisible(false);
		setPickerMode(null);
	};

	return (
		<View className="w-40 my-2">
			<Text className="text-lg mb-1" style={{ color: themeVariables.text }}>
				{label}
			</Text>

			<TouchableOpacity
				onPress={showPicker}
				className="px-4 py-4 rounded-lg border flex-row justify-between border-b-4"
				style={{ borderColor: themeVariables.primary, backgroundColor: themeVariables.background }}>
				<Text style={{ color: themeVariables.text }}>
					{dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
				</Text>
			</TouchableOpacity>

			{modalVisible && (
				<Modal transparent animationType="slide" visible={modalVisible}>
					<View className="flex-1 justify-center items-center bg-black/50">
						<View className="w-10/12 bg-white rounded-lg">
							<Text className="text-lg mb-2 p-4" style={{ color: themeVariables.text }}>
								Sélectionner la date et l'heure
							</Text>

							<DateTimePicker value={tempDate} mode="date" display="spinner" onChange={onChange} />
							<DateTimePicker value={tempDate} mode="time" display="spinner" onChange={onChange} />

							<ButtonComponent onPress={confirmDate} content="Confirmer" width="w-full" padding="p-4" />
						</View>
					</View>
				</Modal>
			)}
		</View>
	);
};

export default DateTimePickerComponent;
