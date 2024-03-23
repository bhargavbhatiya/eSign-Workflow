// Exapmle of DTO for eSign API data
{
    "requests": {
        "actions": [
            {
                "action_id": "60725000000030242",
                "action_type": "SIGN",
                "recipient_name": "John Doe",
                "recipient_email": "bhatiyabhargav.bb@gmail.com",
                "private_notes": "Please review the document",
                "verify_recipient": false,
                "fields": {
                    "check_boxes": [
                        {
                            "field_id": "14197000000767394",
                            "field_name": "Checkbox-1",
                            "field_label": "Checkbox",
                            "field_type_name": "Checkbox",
                            "document_id": "60725000000030224",
                            "action_id": "60725000000030242",
                            "is_mandatory": true,
                            "x_coord": 100,
                            "y_coord": 100,
                            "abs_width": 40,
                            "abs_height": 30,
                            "page_no": 0,
                            "default_value": true,
                            "is_read_only": false,
                            "description_tooltip": "You agree to this"
                        }
                    ],
                    "date_fields": [
                        {
                            "field_name": "Enter your date of birth",
                            "field_label": "DOB",
                            "field_type_name": "CustomDate",
                            "document_id": "60725000000030224",
                            "action_id": "60725000000030242",
                            "is_mandatory": true,
                            "x_value": 100,
                            "y_value": 100,
                            "width": 20,
                            "height": 30,
                            "x_coord": 50,
                            "y_coord": 50,
                            "abs_width": 50,
                            "abs_height": 50,
                            "page_no": 0,
                            "date_format": "dd MMM yyyy",
                            "text_property": {
                                "font_size": 15,
                                "font_color": "000000",
                                "font": "Liberation Serif",
                                "is_italic": true,
                                "is_underline": true,
                                "is_bold": true,
                                "is_read_only": true,
                                "is_fixed_width": false,
                                "is_fixed_height": true,
                                "max_field_length": 200
                            }
                        }
                    ]
                }
            }
        ]
    }
}