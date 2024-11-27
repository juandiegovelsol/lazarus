import unittest

class InsurancePolicy:

    def __init__(self, age, health_score, vehicle_type, accident_history,
                 location, policy_duration, credit_score, employment_status,
                 annual_income):
        self.age = self._validate_age(age)
        self.health_score = self._validate_health_score(health_score)
        self.vehicle_type = self._validate_vehicle_type(vehicle_type)
        self.accident_history = self._validate_accident_history(
            accident_history)
        self.location = self._validate_location(location)
        self.policy_duration = self._validate_policy_duration(policy_duration)
        self.credit_score = self._validate_credit_score(credit_score)
        self.employment_status = self._validate_employment_status(
            employment_status)
        self.annual_income = self._validate_annual_income(annual_income)

    def _validate_age(self, age):
        if not isinstance(age, int) or age < 0:
            raise ValueError("Age must be a non-negative integer.")
        return age

    def _validate_health_score(self, health_score):
        if not isinstance(health_score,
                          int) or health_score < 0 or health_score > 100:
            raise ValueError(
                "Health score must be an integer between 0 and 100.")
        return health_score

    def _validate_vehicle_type(self, vehicle_type):
        valid_types = ["sports", "sedan", "truck"]
        if vehicle_type not in valid_types:
            raise ValueError("Invalid vehicle type. Must be one of: {}".format(
                ", ".join(valid_types)))
        return vehicle_type

    def _validate_accident_history(self, accident_history):
        if not isinstance(accident_history, int) or accident_history < 0:
            raise ValueError(
                "Accident history must be a non-negative integer.")
        return accident_history

    def _validate_location(self, location):
        valid_locations = ["urban", "rural"]
        if location not in valid_locations:
            raise ValueError("Invalid location. Must be one of: {}".format(
                ", ".join(valid_locations)))
        return location

    def _validate_policy_duration(self, policy_duration):
        if not isinstance(policy_duration, int) or policy_duration < 1:
            raise ValueError("Policy duration must be a positive integer.")
        return policy_duration

    def _validate_credit_score(self, credit_score):
        if not isinstance(credit_score,
                          int) or credit_score < 0 or credit_score > 850:
            raise ValueError(
                "Credit score must be an integer between 0 and 850.")
        return credit_score

    def _validate_employment_status(self, employment_status):
        valid_statuses = ["employed", "unemployed"]
        if employment_status not in valid_statuses:
            raise ValueError(
                "Invalid employment status. Must be one of: {}".format(
                    ", ".join(valid_statuses)))
        return employment_status

    def _validate_annual_income(self, annual_income):
        if not isinstance(annual_income, int) or annual_income <= 0:
            raise ValueError("Annual income must be a positive integer.")
        return annual_income

    def _calculate_base_premium(self):
        if self.age < 25:
            if self.vehicle_type == "sports":
                return 500
            elif self.vehicle_type == "sedan":
                return 300
            else:
                return 250
        else:
            return 200

    def _apply_vehicle_type_adjustment(self, premium):
        if self.age >= 25 and self.vehicle_type == "truck":
            return premium + 100
        return premium

    def _apply_policy_duration_adjustment(self, premium):
        if self.age >= 25 and self.vehicle_type == "truck" and self.policy_duration > 5:
            return premium - 50
        return premium

    def _apply_location_adjustment(self, premium):
        if self.location == "urban":
            return premium + 100
        elif self.location == "rural" and self.vehicle_type != "sports":
            return premium - 50
        return premium

    def _apply_age_adjustment(self, premium):
        if self.age > 60:
            return premium + 200
        return premium

    def _apply_health_score_adjustment(self, premium):
        if self.health_score < 70 and self.age < 25 and self.vehicle_type == "sports":
            return premium + 300
        return premium

    def _apply_accident_history_adjustment(self, premium):
        if self.accident_history > 2 and self.age < 25 and self.vehicle_type == "sedan":
            return premium + 150
        return premium

    def _apply_employment_status_adjustment(self, premium):
        if self.employment_status == "unemployed":
            return premium + 200
        return premium

    def _apply_annual_income_adjustment(self, premium):
        if self.employment_status == "employed" and self.annual_income > 60000:
            return premium - 150
        return premium

    def _apply_credit_score_adjustment(self, premium):
        if self.credit_score > 700:
            return premium - 100
        return premium

    def _apply_health_score_and_accident_history_adjustment(self, premium):
        if self.health_score > 80 and self.accident_history == 0:
            return premium - 100
        return premium

    def _calculate_tiered_discount(self, premium):
        if premium > 100:
            if self.credit_score > 750 and self.annual_income > 50000 and self.age < 40 and self.location == "urban":
                premium *= 0.85  # 15% discount
            elif self.credit_score > 700 and self.annual_income > 40000 and self.age < 50 and self.location == "urban":
                premium *= 0.90  # 10% discount
            elif self.credit_score > 650 and self.annual_income > 30000 and self.age < 60:
                premium *= 0.95  # 5% discount
        return premium

    def calculate_premium(self):
        premium = self._calculate_base_premium()
        premium = self._apply_vehicle_type_adjustment(premium)
        premium = self._apply_policy_duration_adjustment(premium)
        premium = self._apply_location_adjustment(premium)
        premium = self._apply_age_adjustment(premium)
        premium = self._apply_health_score_adjustment(premium)
        premium = self._apply_accident_history_adjustment(premium)
        premium = self._apply_employment_status_adjustment(premium)
        premium = self._apply_annual_income_adjustment(premium)
        premium = self._apply_credit_score_adjustment(premium)
        premium = self._apply_health_score_and_accident_history_adjustment(
            premium)
        premium = self._calculate_tiered_discount(premium)
        return max(premium, 100)  # Ensure premium is not less than 100


class TestInsurancePolicy(unittest.TestCase):

    def test_basic_case(self):
        policy = InsurancePolicy(30, 90, "sedan", 0, "urban", 3, 750,
                                 "employed", 70000)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_young_sports_vehicle_high_health_score(self):
        policy = InsurancePolicy(20, 85, "sports", 1, "urban", 2, 800,
                                 "employed", 50000)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_high_age_truck_long_policy(self):
        policy = InsurancePolicy(65, 70, "truck", 1, "rural", 6, 650,
                                 "employed", 60000)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_zero_annual_income_unemployed(self):
        policy = InsurancePolicy(40, 75, "sedan", 1, "rural", 3, 500, "unemployed", 1)
        self.assertGreaterEqual(policy.calculate_premium(), 100)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_high_credit_score_low_income(self):
        policy = InsurancePolicy(55, 85, "sedan", 0, "urban", 4, 720,
                                 "employed", 20000)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_edge_case_high_credit_score_rural_location(self):
        policy = InsurancePolicy(45, 80, "truck", 2, "rural", 3, 800,
                                 "employed", 25000)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_high_health_and_no_accidents(self):
        policy = InsurancePolicy(50, 95, "sedan", 0, "urban", 4, 600,
                                 "employed", 40000)
        premium = policy.calculate_premium()
        self.assertGreaterEqual(premium, 100)

    def test_young_high_income_employed(self):
        policy = InsurancePolicy(24, 75, "sedan", 1, "urban", 2, 710,
                                 "employed", 100000)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_conflicting_discounts_and_surcharges(self):
        policy = InsurancePolicy(30, 50, "sports", 3, "urban", 1, 650,
                                 "unemployed", 30000)
        self.assertGreaterEqual(policy.calculate_premium(), 100)

    def test_negative_credit_score(self):
        with self.assertRaises(ValueError):
            InsurancePolicy(40, 80, "sedan", 1, "urban", 5, -10, "employed",
                            50000)

    def test_zero_policy_duration(self):
        with self.assertRaises(ValueError):
            InsurancePolicy(40, 80, "sedan", 1, "urban", 0, 750, "employed",
                            50000)

    def test_invalid_vehicle_type(self):
        with self.assertRaises(ValueError):
            InsurancePolicy(40, 80, "bike", 1, "urban", 3, 750, "employed",
                            50000)


# Run the tests
if __name__ == '__main__':
    unittest.main()