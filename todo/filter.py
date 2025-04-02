import django_filters
from .models import Todo


class TodoFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr="icontains")
    done = django_filters.BooleanFilter()

    class Meta:
        model = Todo
        fields = ["title", "done"]
