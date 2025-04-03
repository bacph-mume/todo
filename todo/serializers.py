from datetime import datetime
from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
        read_only_fields = ('user',)

    def validate_title(self, value):

        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty")
        return value

    def update(self, instance, validated_data):
        # print(validated_data)

        if "done" in validated_data:
            if validated_data["done"] and instance.completed_at is None:
                validated_data["completed_at"] = datetime.now()
            elif not validated_data["done"]:
                validated_data["completed_at"] = None
        return super().update(instance, validated_data)
