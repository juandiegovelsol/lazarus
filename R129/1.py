class InsurancePolicy:
    def __init__(self, age, health_score, vehicle_type, accident_history, location, policy_duration, credit_score, employment_status, annual_income):
        self.age = age
        self.health_score = health_score
        self.vehicle_type = vehicle_type
        self.accident_history = accident_history
        self.location = location
        self.policy_duration = policy_duration
        self.credit_score = credit_score
        self.employment_status = employment_status
        self.annual_income = annual_income

        # Validate attributes
        if not isinstance(age, int) or age < 0:
            raise ValueError("Age must be a non-negative integer")
        if not isinstance(health_score, int) or health_score < 0 or health_score > 100:
            raise ValueError("Health score must be an integer between 0 and 100")
        if vehicle_type not in ["sports", "sedan", "truck"]:
            raise ValueError("Invalid vehicle type")
        if not isinstance(accident_history, int) or accident_history < 0:
            raise ValueError("Accident history must be a non-negative integer")
        if location not in ["urban", "rural"]:
            raise ValueError("Invalid location")
        if not isinstance(policy_duration, int) or policy_duration < 1:
            raise ValueError("Policy duration must be a positive integer")
        if not isinstance(credit_score, int) or credit_score < 0 or credit_score > 850:
            raise ValueError("Credit score must be an integer between 0 and 850")
        if employment_status not in ["employed", "unemployed"]:
            raise ValueError("Invalid employment status")
        if not isinstance(annual_income, int) or annual_income < 0:
            raise ValueError("Annual income must be a non-negative integer")

    def calculate_premium(self):
        # Calculate base premium
        premium = self._calculate_base_premium()

        # Apply adjustments
        premium = self._apply_age_adjustment(premium)
        premium = self._apply_health_score_adjustment(premium)
        premium = self._apply_vehicle_type_adjustment(premium)
        premium = self._apply_accident_history_adjustment(premium)
        premium = self._apply_location_adjustment(premium)
        premium = self._apply_policy_duration_adjustment(premium)
        premium = self._apply_credit_score_adjustment(premium)
        premium = self._apply_employment_status_adjustment(premium)
        premium = self._apply_annual_income_adjustment(premium)

        # Apply tiered discount
        premium = self._apply_tiered_discount(premium)

        return premium

    def _calculate_base_premium(self):
        # Base premium is 200
        return 200

    def _apply_age_adjustment(self, premium):
        if self.age < 25:
            premium += 100
        elif self.age > 60:
            premium += 200
        return premium

    def _apply_health_score_adjustment(self, premium):
        if self.health_score < 70:
            premium += 300
        elif self.health_score > 80 and self.accident_history == 0:
            premium -= 100
        return premium

    def _apply_vehicle_type_adjustment(self, premium):
        if self.vehicle_type == "sports":
            premium += 500
        elif self.vehicle_type == "sedan":
            premium += 300
        elif self.vehicle_type == "truck":
            premium += 100
        return premium

    def _apply_accident_history_adjustment(self, premium):
        if self.accident_history > 2:
            premium += 150
        return premium

    def _apply_location_adjustment(self, premium):
        if self.location == "urban":
            premium += 100
        elif self.location == "rural" and self.vehicle_type != "sports":
            premium -= 50
        return premium

    def _apply_policy_duration_adjustment(self, premium):
        if self.policy_duration > 5 and self.vehicle_type == "truck":
            premium -= 50
        return premium

    def _apply_credit_score_adjustment(self, premium):
        if self.credit_score > 700:
            premium -= 100
        return premium

    def _apply_employment_status_adjustment(self, premium):
        if self.employment_status == "unemployed":
            premium += 200
        return premium

    def _apply_annual_income_adjustment(self, premium):
        if self.employment_status == "employed" and self.annual_income > 60000:
            premium -= 150
        return premium

    def _apply_tiered_discount(self, premium):
        if self.credit_score > 750 and self.annual_income > 50000 and self.age < 40 and self.location == "urban":
            premium *= 0.85  # 15% discount
        elif self.credit_score > 700 and self.annual_income > 40000 and self.age < 50 and self.location == "urban":
            premium *= 0.9  # 10% discount
        elif self.credit_score > 650 and self.annual_income > 30000 and self.age < 60 and self.location == "urban":
            premium *= 0.95  # 5% discount
        return premium

# Example usage:
policy = InsurancePolicy(30, 80, "sedan", 0, "urban", 5, 750, "employed", 70000)
print(policy.calculate_premium())