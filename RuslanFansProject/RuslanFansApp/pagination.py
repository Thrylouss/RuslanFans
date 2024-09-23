import random

from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 3  # Задайте нужное количество объектов на странице
    page_size_query_param = 'page_size'  # Опционально: позволяет пользователю изменять размер страницы через параметры запроса
    max_page_size = 100  # Опционально: максимальное количество объектов на странице

    def paginate_queryset(self, queryset, request, view=None):
        randomize = request.query_params.get('random', 'false').lower() == 'true'
        if randomize:
            queryset = list(queryset)
            random.shuffle(queryset)
        return super().paginate_queryset(queryset, request, view)

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })